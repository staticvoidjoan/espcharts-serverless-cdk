const { Stack, RemovalPolicy } = require('aws-cdk-lib');
const { UserPool, VerificationEmailStyle, AccountRecovery } = require('aws-cdk-lib/aws-cognito');
const { Construct } = require('constructs');

class CognitoUserPoolStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);
    
    const userpool = new UserPool(this, 'espcharts-user-pool-cdk', {
      userPoolName: 'espcharts-user-pool-cdk',
     
      signInAliases: {
        email: true,
      },
      selfSignUpEnabled: true,
      autoVerify: {
        email: true,
      },
      userVerification: {
        emailSubject: 'You need to verify your email',
        emailBody: 'Thanks for signing up Your verification code is {####} THANK YOU FROM ESPCHARTS', // # This placeholder is a must if code is selected as the preferred verification method
        emailStyle: VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        familyName: {
          mutable: false,
          required: true,
        },
        givenName: {
          mutable: false,
          required: true,
        },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const appClient = userpool.addClient('espcharts-app-client', {
      userPoolClientName: 'espcharts-app-client',
      
      authFlows: {
        userPassword: true,
        userSrp: true, // Enable USER_SRP_AUTH
      },
    });
    this.userpool = userpool
    console.log("User Pool ARN:", userpool.userPoolArn);

  }
 
}


module.exports = { CognitoUserPoolStack };
