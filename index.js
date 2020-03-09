const { graphql, buildSchema } = require('graphql')

const schema = buildSchema(`
    type Query {
        message: String
    }
`)

const rootValue = {
    message: () => 'GraphQL is up and running'
}

graphql(
    schema,
    `
        {
            message
        }
    `,
    rootValue
).then(
    res => console.log(res)
)