import React from 'react';
import logo from './logo.svg';
import './App.css';
// import GitForm from './components/GitForm';
import { render } from '@testing-library/react';
import { get } from 'axios'; 
import { Layout, Input, Table, Card, Avatar, List, Switch} from 'antd';
const { Header, Footer, Sider, Content } = Layout;


const columns = [
  {
    title: 'Login',
    dataIndex: 'login',
    key: 'login',
  },
  // {
  //   title: 'Avatar',
  //   dataIndex: 'avatar_url',
  //   key: 'avatar_url',
  //   render: imgSrc => <img src={ imgSrc } style={{height: '100px'}} />,
  // },
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Public Repos',
    dataIndex: 'public_repos',
    key: 'public_repos',
    // sorter: {
    //   compare: (a, b) => b.public_repos - a.public_repos ,
    // },
  },
  {
    title: 'Public Gists',
    dataIndex: 'public_gists',
    key: 'public_gists',
  },
  {
    title: 'Followers',
    dataIndex: 'followers',
    key: 'followers',
    // sorter: {
    //   compare: (a, b) => b.followers - a.followers ,
    // },
  },
  {
    title: 'Following',
    dataIndex: 'following',
    key: 'following',
  },
];


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      sort: false,
      users: [],
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    if (window.location.search) {
      const usernames = window.location.search.split('=')[1];
      if (usernames) usernames.split(',').map(this.onFormSubmit);
    }
  }

  onFormSubmit(gitid){
    get(`https://api.github.com/users/${gitid}`)
    .then(({ data }) => {
      const { login, id, name } = data;
  
      this.setState({ users: [...this.state.users, data] });
    });
  }
  onChange = checked => {
    this.setState({ sort: checked });
  };

  render() {
    const users = this.state.sort ? 
      [...this.state.users]
        .sort((u2, u1) => u1.public_repos - u2.public_repos) 
     : this.state.users;
    return (<>
      <Header>
        {/*<div className="App">
          <GitForm onSubmit={this.onFormSubmit} />
          </div>*/}
        <Input.Search
          placeholder="git id"
          onSearch={this.onFormSubmit}
          size="large"
          
        />
      </Header>
      <Content>
        <Switch checkedChildren="sorted" unCheckedChildren="unsorted"  checked={this.state.sort} onChange={this.onChange} />

        {/*<Table dataSource={this.state.users} columns={columns} /> */}

        <Card title="Git Users">{
          users
          .map(user => (
            <Card.Grid style={{ width: 300, margin: 16 }}>
              <Card.Meta
                avatar={
                  <Avatar src={user.avatar_url} />
                }
                title={user.login}
                description={"Info"}
              />
              {
                columns.map(column => (
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{fontWeight: 'bold'}}>{column.title}</div>
                    <div>{user[column.key]}</div>
                  </div>
                ))
              }

          </Card.Grid>
  
        ))}</Card>

      </Content>
      <Footer>
              <div style={{ textAlign: "center"}}>GIT PROFILE COMPARE</div>
      </Footer>
      </>
    );
  }
}


export default App;
