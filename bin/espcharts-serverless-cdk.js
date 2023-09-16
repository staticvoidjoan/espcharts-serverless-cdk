#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { EspchartsServerlessCdkStack } = require('../lib/espcharts-serverless-cdk-stack');
const {CognitoUserPoolStack} = require('../lib/espcharts-userpool');

const app = new cdk.App();
const cognitoPool = new CognitoUserPoolStack(app, "CognitoUserPoolStack",{});

new EspchartsServerlessCdkStack(app, 'EspchartsServerlessCdkStack', {
cognitoPool: cognitoPool
});

