#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCdkPipelineStack } from '../lib/aws-cdk-pipeline-stack';
const app = new cdk.App();
new AwsCdkPipelineStack(app, 'AwsCdkPipelineStack', {
  env: {
    account: '064669052383',
    region: 'us-east-1',
  }
});

app.synth();