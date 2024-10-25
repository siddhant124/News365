import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: -20,
    backgroundColor: '#FFF',
  },
  parentView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  bellIconContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#F6F6F7',
    padding: 8,
    borderRadius: 999,
  },
  headerTitle: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  headerViewAll: {
    fontSize: 16,
    color: '#0169E1',
    fontWeight: '600',
  },
  cardContainer: {
    width: screenWidth * 0.9,
    height: 200,
    marginHorizontal: screenWidth * 0.05,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.4,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryBadge: {
    backgroundColor: '#2196F3',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 12,
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  sourceTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sourceText: {
    color: 'white',
    fontSize: 12,
  },
  timeText: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  titleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  recommendedSectionView: {
    paddingHorizontal: 24,
    flex: 1, // Allow this section to take the remaining space
  },

  recommendedHeaderContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },

  recommendedHeading: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});
