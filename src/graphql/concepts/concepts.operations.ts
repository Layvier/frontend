import { ConceptData } from './concepts.fragments';
import gql from 'graphql-tag';

export const addConceptToDomain = gql`
  mutation addConceptToDomain($domainId: String!, $payload: CreateConceptPayload!) {
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
          _id
          name
          type
        }
      }
    }
  }
  ${ConceptData}
`;

export const listDomainConcepts = gql`
  query listDomainConcepts($domainKey: String!, $options: DomainConceptsOptions!) {
    getDomainByKey(key: $domainKey) {
      _id
      name
      concepts(options: $options) {
        items {
          ...ConceptData
        }
      }
    }
  }
  ${ConceptData}
`;