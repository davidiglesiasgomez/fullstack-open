const Hello = (props) => {  
  return (    
    <div>      
      <p>Hello {props.name}, you are {props.age} years old</p>    
    </div>  
  )
}

const Footer = () => {  
  return (    
    <div>
      Greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
    </div>
  )
}

const App = () => {
  const name = 'Peter'  
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={age + 10} />    
      <Hello name="John" age={age + 5} />    
      <Hello name={name} age={age} />    
      <Footer />
    </div>
  )
}

export default App;
