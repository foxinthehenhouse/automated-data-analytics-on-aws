/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
import { ApiLambdaHandler, ApiResponse } from '@ada/api-gateway';
import { AttributeValuePolicyStore } from '../components/ddb/attribute-value-policy-store';
import VError from 'verror';

/**
 * Handler for getting the attribute policy for a given attribute and group
 * @param event api gateway request
 * @param context lambda context
 */
export const handler = ApiLambdaHandler.for('getGovernancePolicyAttributeValuesAttribute', async ({ requestParameters }) => {
  const { attributeId, ontologyNamespace } = requestParameters;

  try {
    console.log(`Query attrite values for ${ontologyNamespace}/${attributeId}`);
    const policies = await AttributeValuePolicyStore.getInstance().getAttributeValuePoliciesByAttributeId(
      ontologyNamespace,
      attributeId,
    );
    return ApiResponse.success({
      policies
    });
  } catch (e: any) {
    return ApiResponse.badRequest(
      new VError(
        { name: 'GetAttributePoliciesForAttributeError', cause: e },
        `Error retrieving attribute policy for attributeId ${ontologyNamespace}.${attributeId}`,
      ),
    );
  }
});
