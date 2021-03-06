import { ConceptData } from './concepts.fragments';
import gql from 'graphql-tag';
import { ResourcePreviewData } from '../resources/resources.fragments';

export const addConceptToDomain = gql`
  mutation addConceptToDomain($domainId: String!, $payload: AddConceptToDomainPayload!) {
    addConceptToDomain(domainId: $domainId, payload: $payload) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;

export const updateConcept = gql`
  mutation updateConcept($_id: String!, $payload: UpdateConceptPayload!) {
    updateConcept(_id: $_id, payload: $payload) {
      ...ConceptData
    }
  }
  ${ConceptData}
`;

export const deleteConcept = gql`
  mutation deleteConcept($_id: String!) {
    deleteConcept(_id: $_id) {
      _id
      success
    }
  }
`;

export const getConcept = gql`
  query getConcept($_id: String!) {
    getConcept(_id: $_id) {
      ...ConceptData
      coveredByResources(options: {}) {
        items {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${ConceptData}
  ${ResourcePreviewData}
`;

export const getConceptByKey = gql`
  query getConceptByKey($key: String!) {
    getConceptByKey(key: $key) {
      ...ConceptData
      coveredByResources(options: {}) {
        items {
          ...ResourcePreviewData
        }
      }
    }
  }
  ${ConceptData}
  ${ResourcePreviewData}
`;
