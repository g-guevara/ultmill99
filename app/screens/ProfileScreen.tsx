// app/screens/UserProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Image
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { User } from '../components/Login/Users';

interface UserProfileScreenProps {
  user: User;
  onLogout: () => void;
  onClose: () => void;
}

export default function UserProfileScreen({ user, onLogout, onClose }: UserProfileScreenProps) {

  
  // Sample state for profile settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationTrackingEnabled, setLocationTrackingEnabled] = useState(false);
  
  // Placeholder order history
  const orderHistory = [
    { id: '123456', date: '12 Apr 2025', status: 'Delivered', total: 36.99 },
    { id: '123455', date: '4 Apr 2025', status: 'Delivered', total: 42.50 },
    { id: '123454', date: '27 Mar 2025', status: 'Delivered', total: 18.95 }
  ];

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Log Out",
          onPress: onLogout,
          style: "destructive"
        }
      ]
    );
  };

  const handleSupportRequest = () => {
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>Profile</Text>
        
        {/* User info section */}
        <View style={styles.userInfoContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.memberSince}>Member since May 2025</Text>
          </View>
        </View>
        
        {/* Account settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.menuItem} >
            <MaterialIcons name="person" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} >
            <MaterialIcons name="credit-card" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Payment Methods</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} >
            <MaterialIcons name="home" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Address Book</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
        
        {/* Preferences */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.toggleItem}>
            <MaterialIcons name="notifications" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.toggleItemText}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ddd', true: '#4285F4' }}
              thumbColor="#fff"
            />
          </View>
          
          <View style={styles.toggleItem}>
            <MaterialIcons name="dark-mode" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.toggleItemText}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#ddd', true: '#4285F4' }}
              thumbColor="#fff"
            />
          </View>
          
          <View style={styles.toggleItem}>
            <MaterialIcons name="location-on" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.toggleItemText}>Location Services</Text>
            <Switch
              value={locationTrackingEnabled}
              onValueChange={setLocationTrackingEnabled}
              trackColor={{ false: '#ddd', true: '#4285F4' }}
              thumbColor="#fff"
            />
          </View>
        </View>
        
        {/* Order history */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Order History</Text>
          
          {orderHistory.map(order => (
            <TouchableOpacity 
              key={order.id} 
              style={styles.orderItem}
              
            >
              <View>
                <Text style={styles.orderNumber}>Order #{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderRightContent}>
                <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
                <Text style={[
                  styles.orderStatus,
                  order.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing
                ]}>
                  {order.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View All Orders</Text>
          </TouchableOpacity>
        </View>
        
        {/* Help & Support */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Help & Support</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleSupportRequest}>
            <MaterialIcons name="help" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>Contact Support</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} >
            <MaterialIcons name="question-answer" size={22} color="#666" style={styles.menuIcon} />
            <Text style={styles.menuItemText}>FAQs</Text>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
        
        {/* Logout button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        {/* Version info */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: '#999',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  toggleItemText: {
    flex: 1,
    fontSize: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderRightContent: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusDelivered: {
    backgroundColor: '#E9F7EF',
    color: '#27AE60',
  },
  statusProcessing: {
    backgroundColor: '#FEF9E7',
    color: '#F39C12',
  },
  viewAllButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 30,
  },
});