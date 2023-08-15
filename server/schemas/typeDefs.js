type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    cardioWorkouts: [CardioWorkout]
    weightWorkous: [WeightWorkout]
}

type Auth {
    token: ID!
    user: User
}

type CardioWorkout {
    _id: ID!
    user: User!
    workoutName: String
    distance: String 
    date: String
}