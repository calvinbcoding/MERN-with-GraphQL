const { graphql, buildSchema } = require('graphql')

const db = {
    users: [
        { id: '1', email: 'calvinb@gmail.com', name: 'Calvin' },
        { id: '2', email: 'alexis@gmail.com', name: 'Alexis' },
    ]
}

const schema = buildSchema(`
    type Query {
        users: User
    }

    type User {
        id: ID!
        email: String!
        name: String
        imageURL: String
    }
`)

const rootValue = {
    users: () =>
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
    console.log
).catch(
    console.error
)