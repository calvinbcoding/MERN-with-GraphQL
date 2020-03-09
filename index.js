const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const db = {
    users: [
        { id: '1', email: 'calvinb@gmail.com', name: 'Calvin', imageURL: 'https://gravatar.com/...' },
        { id: '2', email: 'alexis@gmail.com', name: 'Alexis', imageURL: 'https://gravatar.com/...' }
    ]
}

const schema = buildSchema(`
    type Query {
        users: [User!]!
    }

    type Mutation {
        addUser(email: String!, name: String): User
    }

    type User {
        id: ID!
        email: String!
        name: String
        imageURL: String
    }
`)

const rootValue = {
    users: () => db.users,
    addUser: ({ email, name }) => {
        const user = {
            id: crypto.randomBytes(10).toString(),
            email,
            name
        }

        db.users.push(user)

        return user
    }
}

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(3000, () => console.log('Express server is up and listening on port 3000'))


// const { graphql, buildSchema } = require('graphql')

// graphql(
//     schema,
//     `
//         {
//             users {
//                 id
//                 email
//             }
//         }
//     `,
//     rootValue
// ).then(
//     res => console.dir(res, { depth: null })
// ).catch(
//     console.error
// )