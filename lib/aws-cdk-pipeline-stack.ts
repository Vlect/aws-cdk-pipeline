import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { 
  CodePipeline, 
  CodePipelineSource, 
  ShellStep, 
  ManualApprovalStep 
} from 'aws-cdk-lib/pipelines';

export class AwsCdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'Testpipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('vlect/aws-cdk-pipeline', 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ]
      })
    })
  }
}
// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// // import * as sqs from 'aws-cdk-lib/aws-sqs';

// export class AwsCdkPipelineStack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     // The code that defines your stack goes here

//     // example resource
//     // const queue = new sqs.Queue(this, 'AwsCdkPipelineQueue', {
//     //   visibilityTimeout: cdk.Duration.seconds(300)
//     // });
//   }
// }
