import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { colors, typography, spacing } from '../constants/theme';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Ionicons } from '@expo/vector-icons';

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Study Group',
    'Math 101',
    'Computer Science',
  ]);

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
    handleSearch();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search for sessions or groups"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            leftIcon={<Ionicons name="search" size={20} color={colors.textLight} />}
          />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => handleRecentSearch(search)}
              >
                <Ionicons name="time-outline" size={20} color={colors.textLight} />
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <View style={styles.categoriesContainer}>
              <TouchableOpacity style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Ionicons name="book-outline" size={24} color={colors.primary} />
                </View>
                <Text style={styles.categoryText}>Study Groups</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Ionicons name="code-outline" size={24} color={colors.primary} />
                </View>
                <Text style={styles.categoryText}>Programming</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem}>
                <View style={styles.categoryIcon}>
                  <Ionicons name="calculator-outline" size={24} color={colors.primary} />
                </View>
                <Text style={styles.categoryText}>Mathematics</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.backgroundDark,
    borderRadius: spacing.md,
    marginBottom: spacing.sm,
  },
  recentSearchText: {
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text,
    fontFamily: typography.fontFamily.regular,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  categoryItem: {
    width: '33.33%',
    padding: spacing.sm,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
  },
}); 