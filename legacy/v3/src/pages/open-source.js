/* eslint-disable react/prop-types */
import { graphql } from 'gatsby'
import React from 'react'

import Head from '../components/Head'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Section from '../components/Section'

const OpenSource = ({ data }) => (
  <Layout>
    <Head pageTitle="Open Source" />
    <Section className="content">
      <h1 className="title">
        Open Source <i className="e1a-sparkles" />
      </h1>
      <p>
        Here are GitHub repositories that I authored, contribute, and maintain
      </p>
      <br />
      {data.repos.edges.map(({ node }) => (
        <React.Fragment key={node.type}>
          <h6>{node.type}</h6>
          <ul>
            {node.repos.map(({ name, description, url }) => (
              <li key={name}>
                <Link href={url}>{name}</Link> - {description}
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </Section>
  </Layout>
)

export default OpenSource

export const query = graphql`
  {
    repos: allOpenSourceJson {
      edges {
        node {
          type
          repos {
            url
            name
            description
          }
        }
      }
    }
  }
`
