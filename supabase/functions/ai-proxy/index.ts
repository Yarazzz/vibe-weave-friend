import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      messages, 
      apiConfig,
      adminConfig 
    } = await req.json();

    console.log('Received request with config:', { 
      hasApiConfig: !!apiConfig, 
      hasAdminConfig: !!adminConfig,
      useLocalProgram: adminConfig?.useLocalProgram 
    });

    // Determine which API configuration to use
    let targetUrl: string;
    let apiKey: string;
    let model: string;

    // Check if admin forces local program
    if (adminConfig?.useLocalProgram && adminConfig?.localProgramUrl) {
      console.log('Using local program:', adminConfig.localProgramUrl);
      
      // Call local program with user's API config
      const response = await fetch(adminConfig.localProgramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          apiConfig: adminConfig.forceApi ? {
            apiKey: adminConfig.forcedApiKey,
            apiEndpoint: adminConfig.forcedApiEndpoint,
            model: adminConfig.forcedModel,
          } : apiConfig,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Local program error:', response.status, errorText);
        throw new Error(`Local program error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Use standard API (forced or user-provided)
    if (adminConfig?.forceApi) {
      targetUrl = adminConfig.forcedApiEndpoint || 'https://api.openai.com/v1/chat/completions';
      apiKey = adminConfig.forcedApiKey || '';
      model = adminConfig.forcedModel || 'gpt-3.5-turbo';
      console.log('Using forced API configuration');
    } else {
      targetUrl = apiConfig?.apiEndpoint || 'https://api.openai.com/v1/chat/completions';
      apiKey = apiConfig?.apiKey || '';
      model = apiConfig?.model || 'gpt-3.5-turbo';
      console.log('Using user API configuration');
    }

    if (!apiKey) {
      throw new Error('API key is required');
    }

    // Call the AI API
    console.log('Calling AI API:', targetUrl);
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('AI API response received');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-proxy function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
