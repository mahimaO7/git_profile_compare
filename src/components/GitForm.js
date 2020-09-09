import React from 'react';
import { Input, Button, Row, Col } from 'antd';

class GitForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            gitid: ''
        };
        this.inputUpdated = this.inputUpdated.bind(this);
        this.submitGitId = this.submitGitId.bind(this);
    }

    submitGitId(e) {
        e.preventDefault();

        const { gitid } = this.state;
        const { onSubmit } = this.props;

        onSubmit(gitid);
        this.setState({ gitid: ''});
    }

    inputUpdated(e) {
        const { value } = e.target;

        this.setState({ gitid: value });
    }

    render() {
        return (
          <div className="git-form">
            <form onSubmit={this.submitGitId}>
              <label htmlFor="gitid">Git ID</label>
              <Input
                type="input"
                name="gitid"
                value={this.state.gitid}
                onInput={this.inputUpdated} />
              <Button type="submit" className='btn btn-success'>Get the ID!!</Button>
            </form>
          </div>
        );
    }
}

export default GitForm;