import React from 'react'

const Header = ({ course }) => {
    return (
        <h2>{course.name}</h2>
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
    return course.parts.map((part) => <Part key={part.id} part={part} />)
}

const Total = ({ course }) => {
    return (
        <strong>Total of {course.parts.reduce((sum, part) => sum += part.exercises, 0)} exercises</strong>
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