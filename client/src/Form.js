import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

class Form extends Component {
  render() {
    return (
        <Card style={{width: '1000px', margin: "0 auto"}}>
          <form action="/" name="toAnalyze">
            <TextField
              name="resume"
              floatingLabelText="Resume and Cover Letter"
              multiLine={true}
              rows={10}
              rowsMax={20}
              fullWidth={true}
              style={{ textAlign: 'left', width: '90%' }}
            />
            <div>
              <RaisedButton label="Analyze" onClick={this.props.onSubmit} />
            </div>
          </form>
        </Card>
        );
  }
}

export default Form;
