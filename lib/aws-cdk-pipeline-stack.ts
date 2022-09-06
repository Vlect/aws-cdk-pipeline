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
        input: CodePipelineSource.gitHub('Vlect/aws-cdk-pipeline', 'main'),
        commands: ['npm ci',
                   'npm run build',
                   'npx cdk synth']
      })
    })
  }
}
