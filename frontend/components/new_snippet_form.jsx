import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';

const NewSnippetForm = React.createClass({
	onChange(newValue) {
		console.log('change',newValue);
	},

	render() {
		return (
			<AceEditor
				mode="javascript"
				theme="github"
				onChange={this.onChange}
				name="UNIQUE_ID_OF_DIV"
				editorProps={{$blockScrolling: true}}
			/>
		);
	}
});

module.exports = NewSnippetForm;
