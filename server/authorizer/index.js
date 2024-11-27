const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const token = event.authorizationToken;
  const methodArn = event.methodArn;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const policy = generatePolicy(decoded.email, "Allow", methodArn);
    return policy;
  } catch (err) {
    console.error("Authorization error:", err);
    return generatePolicy("user", "Deny", methodArn);
  }
};

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {
    principalId: principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
  return authResponse;
};
