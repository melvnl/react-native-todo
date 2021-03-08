import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/goalItem'
import GoalInput from './components/goalInput'

export default function App() {
  
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode,setIsAddMode] = useState(false);
  

  const addGoalHandler = goalTitle => {
    setCourseGoals( currentGoals => [...currentGoals,
      {id: Math.random().toString(), value: goalTitle}]);
      setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id!== goalId )
    })
  }

  const cancelGoal = () => {
    setIsAddMode(false)
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={ () => setIsAddMode(true)} />
      <GoalInput onAddGoal={addGoalHandler} visible={isAddMode} onCancel={cancelGoal} />  
      <FlatList 
      keyExtractor={(item, index)=> item.id}
      data= {courseGoals} renderItem={itemData => 
      <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value}/>
      } />
                
      </View>

  );
}

const styles = StyleSheet.create({
  screen : {
    padding : 50
  }
  
});
