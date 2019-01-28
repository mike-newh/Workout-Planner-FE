import React, { Component, Fragment } from 'react';
import { Text, ScrollView, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import Model from '../components/Model';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
const URL = 'https://nc-project-be.herokuapp.com/api/';

export default class CreateExerciseForm extends Component {
	state = {
		title: '',
		content: '',
		major_muscle: '',
		minor_muscle: '',
		muscles: []
	};

	render() {
		const majorList = this.state.muscles.reduce((acc, currValue) => {
			const newObj = {};
			const value = 'value';
			newObj[value] = currValue.muscle_name;
			acc.push(newObj);
			return acc;
		}, []);
		return (
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Container>
						<Model />
						<Content>
							<Form>
								<Item>
									<TextInput
										placeholder='Exercise name...'
										onChangeText={(title) => this.setState({ title })}
										value={this.state.title}
									/>
									<TextInput
										placeholder='Exercise description...'
										onChangeText={(content) => this.setState({ content })}
										value={this.state.content}
									/>
								</Item>
								<Container>
									<Dropdown
										data={majorList}
										label='Major Muscle'
										onChangeText={(value) => {
											this.setState({ major_muscle: value });
										}}
									/>
									<Dropdown
										data={majorList}
										label='Minor Muscle'
										onChangeText={(value) => {
											this.setState({ minor_muscle: value });
										}}
									/>
									<TouchableOpacity onPress={this.addToExercises}>
										<Text>Submit</Text>
									</TouchableOpacity>
								</Container>
							</Form>
						</Content>
					</Container>
				</ScrollView>
			</View>
		);
	}

	componentDidMount() {
		return fetch(`${URL}/muscles`)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState(
					{
						muscles: responseJson.muscles
					},
					function() {}
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	addToExercises = () => {
		axios
			.post(
				`${URL}/exercises`,
				{
					title: this.state.title,
					content: this.state.content,
					major_muscle: this.state.major_muscle,
					minor_muscle: this.state.minor_muscle,
					created_by: '5c4ee735eff6044a774a70ce'
				},
				console.log()
			)
			.then(() => {
				console.log();
				this.props.navigation.navigate('HomePage');
			})
			.catch((err) => {
				console.log(err);
			});
	};
}