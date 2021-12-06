import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    return course.parts.map((part) => <Part part={part} />)
}

const Total = ({ course }) => {
    return (
        <p>Total of {course.parts.reduce((sum, part) => sum += part.exercises, 0)} exercises</p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
        <Header course={ course } />
        <Content course={ course } />
        <Total course={ course } />
        </div>
    )
}

export default Course