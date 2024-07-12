import React, { useContext } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { Button, ListItem, Avatar } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialIcons";
import UsersContext from "../context/UsersContext";

export default props => {

    const { state, dispatch } = useContext(UsersContext)

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                },
            },
            {
                text: 'Não',
            },
        ]);
    }

    function getActions(user) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type="clear"
                    icon={
                        <Icon 
                            name="edit" 
                            size={25} 
                            color="blue" 
                        />
                    }
                />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={
                        <Icon 
                            name="delete" 
                            size={25} 
                            color="red" 
                        />
                    }
                />
            </View>
        );
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem
                key={user.id}
                bottomDivider
                onPress={() => props.navigation.navigate('userForm')}>
                <Avatar rounded source={{ uri: user.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>{getActions(user)}</ListItem.Content>
            </ListItem>
        );
    }

    return (
        <View>
            <FlatList
                data={state.users}
                keyExtractor={user => user.id.toString()}
                renderItem={getUserItem}
            />
        </View>
    );
}