import './App.css';
import './responsive.css';
import data from './data.json';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';


function Avatar(props) {
  const imageClick = ()=> {
    props.onClick(props.selectedIndex);
  }
  if(props.selected === 'true') {
    return (
      <div className="avatar-border">
        <img className="avatar-container" src={props.url} />
      </div>
    );
  } else {
    return (
      <div style={{padding: '4px'}}>
        <img className="avatar-container" src={props.url} onClick={() => imageClick()}/>
      </div>
    );
  }
}

function App() {

  const [id, setId] = useState(1);

  let handleClick = () => {
    if(id===1) {
      setId(10);
    }else {
      setId(id-1);
    }
  }

  let handleImageClick = (i) => {
    if(i) {
      setId(i);
    } else {
      setId(1);
    }
  }

  let avatarsList = data.map((element) => <Avatar key={element.id} url={element.avatar} selected={element.id === id ? "true" : "false"} onClick={(i) => handleImageClick(i)} selectedIndex={element.id}></Avatar>)

  let mdList = data.map((element) => 
    <CSSTransition
    in={id === element.id}
    key={element.id}
    timeout={500}
    classNames="item"
    unmountOnExit>
      <div>
        <div style={{height: '13vh'}}>
          <h2>{element.message }</h2>
        </div>
        <p style={{marginTop: '0'}}>{element.lorem}</p>
        <div id="textbox">
          <h5 className="alignleft">{element.name},
            <span className="lighter-text">{element.designation}, {element.location}</span>
          </h5>
          <a href="/" className="anchor-right">READ FULL STORY</a>
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    </CSSTransition>
  );

  return (
    <div className="container">
      <div className="capsule">
        <div className="pl-48">
          <h5>TESTIMONIALS</h5>
          <div className="mdlist-container">
            { mdList }
          </div>
          <div id="textbox">
            <div className="alignleft-avatars">
              <div className="horizontal-list">
                {avatarsList}
              </div>              
            </div>
            <div className="alignright">
              <div className="horizontal-list">
                <div className="arrow-container">
                  <div className="arrow-padding" onClick={() => handleClick()}>&#8592;</div>
                </div>
                <div className="arrow-container">
                  <div className="arrow-padding" onClick={() => setId((id%10)+1)}>&#8594;</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{clear: 'both'}}></div>          
        </div>
      </div>
    </div>
  );
}

export default App;
