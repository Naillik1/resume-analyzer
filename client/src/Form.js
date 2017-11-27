import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import './Form.css';

class Form extends Component {
  render() {
    return (
        <Card className="formContainer">
          <form action="/" name="toAnalyze">
            <TextField
              name="resume"
              floatingLabelText="Resume and Cover Letter"
              multiLine={true}
              rows={10}
              rowsMax={15}
              fullWidth={true}
              style={{ textAlign: 'left', width: '90%' }}
              errorText={this.props.errors.reason}
            />
            <div>
              <RaisedButton 
                label="Analyze" 
                fullWidth={true}
                primary={true}
                onClick={this.props.onSubmit} />
            </div>
          </form>
        </Card>
        );
  }
}

export default Form;
