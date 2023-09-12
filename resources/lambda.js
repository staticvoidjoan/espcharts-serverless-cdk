module.exports.handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify("HELLO WORLD I AM A LAMBDA FROM CDK"),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
