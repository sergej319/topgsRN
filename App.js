import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useState } from 'react';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import Sandbox from './components/sandbox';
import axios from 'axios'
import DayItem from './components/dayItem';

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [cities, setCities] = useState([])
  const [dayData, setDayData] = useState()
  const [multipleDayData, setMultipleDayData] = useState()
  const [uniqueDays, setUniqueDays] = useState([])
  const [uniqueHours, setUniqueHours] = useState([])

  const appid = '317875d9da97449bd31293b89a4d994e'
  //"https://api.openweathermap.org/data/2.5/forecast?lat=" . $_POST['lat'] . "&lon=" . $_POST['lon'] . "&units=metric&appid=" . $api_key
  //http://api.openweathermap.org/geo/1.0/direct?q=' . $_POST['city_name'] . '&limit=5&appid=' . $api_key
  

 const fetchDayData = async (item) => {
			
    try {
      setIsLoading(true)
        await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${item.lat}&lon=${item.lon}&units=metric&appid=${appid}`, 
            //`http://api.openweathermap.org/geo/1.0/direct?q=${item.input}&limit=5&appid=${appid}`,
          { 
            withCredentials: true,
            credentials: 'include',
            crossorigin: true, 
            
            
          },
        ).then((res) => {

            setDayData(res.data)
        });
        }catch (error) {
          console.log(error.message);
        }				  
}


const fetchMultipleDayData = async (item) => {
			
  try {
    setIsLoading(true)
      await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${item.lat}&lon=${item.lon}&units=metric&appid=${appid}`, 
        { 
          withCredentials: true,
          credentials: 'include',
          crossorigin: true, 
          
          
        },
      ).then((res) => {

          const days = res.data.list.map(day => {
            const date = new Date(day.dt_txt)
            return(
            date.getDay() === 0 ? 'Monday' 
            : date.getDay() === 1 ? 'Tuesday' 
            : date.getDay() === 2 ? 'Wednesday' 
            : date.getDay() === 3 ? 'Thursday' 
            : date.getDay() === 4 ? 'Friday' 
            : date.getDay() === 5 ? 'Saturday' 
            : 'Sunday' )
          })


          const hours = res.data.list.map(hour => {
            const date = new Date(hour.dt_txt)
            const newHour = date.getHours()
            //console.log('NewHour:', newHour)
            return newHour
          })

          setMultipleDayData(res.data)
          setUniqueDays([... new Set(days)])
          setUniqueHours([... new Set(hours)])
      });
      }catch (error) {
        console.log(error.message);
      }				  
}

const fetchCitiesFunc = async (search) => {
    
    try {
      setIsLoading(true)
        await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=3&appid=317875d9da97449bd31293b89a4d994e`, 
            //`http://api.openweathermap.org/geo/1.0/direct?q=Z&limit=3&appid=${appid}`, 
          { 
            withCredentials: true,
            credentials: 'include',
            crossorigin: true, 
            
            
          },
        ).then((res) => {

            setCities(res.data)
        });
        }catch (error) {
          console.log(error.message);
        }				  
}
// console.log('citiesMAINPAGE:', cities)
// console.log('dayData:', dayData)
// console.log('multipleDAYDATA:', multipleDayData)
//console.log('uniqueHours', uniqueHours)
  

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo fetchCitiesFunc={fetchCitiesFunc}/>
        <View style={styles.list}>
          <FlatList 
            data={cities}
            renderItem={({item}) => (
              <TodoItem 
                item={item} 
                fetchDayData={fetchDayData} 
                fetchMultipleDayData={fetchMultipleDayData}
              />
            )}
          />
        </View>

       
          
        
      </View>
      {multipleDayData != undefined &&
          <View style={styles.content}>
            <Text>Selected location: {dayData.name}</Text>
            <View style={styles.list}>
              <ScrollView>
              <View style={styles.flexboxContainer}>
                <View>
                  <Text style={styles.tableHeader}>Hour</Text>
                
              {
                uniqueHours.map((hour, idx) => (
                  <Text style={styles.tableHeader} key={idx}>{hour}:00</Text>
                ))
              }
              </View>
                {
                  uniqueDays.map((day, idx) => {
                    return(
                      <View key={idx}>
                        
                        <Text style={styles.tableHeader}>{day}</Text>
                        
                        {

                          multipleDayData.list.map((item, index) => {
                            const date = new Date(item.dt_txt)
                            //console.log('date:', item)
                            const newDay = (date.getDay() === 0 ? 'Monday' 
                                    : date.getDay() === 1 ? 'Tuesday' 
                                    : date.getDay() === 2 ? 'Wednesday' 
                                    : date.getDay() === 3 ? 'Thursday' 
                                    : date.getDay() === 4 ? 'Friday' 
                                    : date.getDay() === 5 ? 'Saturday' 
                                    : 'Sunday' )
                                    //console.log('newDay:', newDay)
                            if(newDay == day){
                              return <DayItem key={index} item={item}/>
                            }
                          })
                        }
                      </View>
                      
                    )
                  })
                }
                </View>
              </ScrollView>
            </View>
          </View>
          }
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  content: {
    padding: 10, 
    paddingHorizontal: 20,
    flex: 1

  },
  list: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1
  },
  flexboxContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  table: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 13
  },
  tableHeader: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: 'bold'
  }

});
