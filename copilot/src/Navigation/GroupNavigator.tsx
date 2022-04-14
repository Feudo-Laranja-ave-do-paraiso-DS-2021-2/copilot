import React, {useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Group, CreateGroup, EnterGroup } from '../Screens'
import * as Application from 'expo-application'
import axios from 'axios' 

const GroupStack = createStackNavigator()

const GroupNavigator: React.FC = () => {
  const { Navigator, Screen } = GroupStack
  const deviceId =  Application.androidId ?? "";
   
  return (
    <Navigator>
      <Screen name="Group" component={Group} initialParams={{usuario_id: deviceId}} options={{ headerShown: false }}/>
      <Screen name="CreateGroup" component={CreateGroup} initialParams={{usuario_id: deviceId}} options={{ headerShown: false }} />
      <Screen name="EnterGroup" component={EnterGroup} initialParams={{usuario_id: deviceId}} options={{ headerShown: false }}/>
    </Navigator>
  )
}

export default GroupNavigator
