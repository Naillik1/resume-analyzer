import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import './styles/Form.css';

class Form extends Component {
  render() {
    return (
        <Card className="center">
          <form action="/" name="toAnalyze">
            <TextField
              name="text"
              floatingLabelText="Text"
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
