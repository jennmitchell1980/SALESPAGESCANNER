const Anthropic = require("@anthropic-ai/sdk");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: body.model || "claude-haiku-4-5-20251001",
      max_tokens: body.max_tokens || 1000,
      messages: body.messages
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {"Access-Control-Allow-Origin": "*"},
      body: JSON.stringify({ error: error.message })
    };
  }
};
