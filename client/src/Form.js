import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

class Form extends Component {
  render() {
    return (
        <Card>
          <form action="/" name="submit">
            <TextField
              name="resume"
              floatingLabelText="Resume and Cover Letter"
              multiLine={true}
              rows={10}
              rowsMax={20}
              fullWidth={true}
              inputStyle={{ textAlign: 'center' }}
              hintStyle={{ width: '600px', textAlign: 'center' }}
              style={{ width: '800px' }}
            />
            <div>
            <RaisedButton label="Analyze" />
          </div>
            </form>
        </Card>
        );
  }
}

export default Form;
