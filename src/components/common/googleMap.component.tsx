import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenHeight, ScreenWidth} from 'react-native-elements/dist/helpers';
import MapView, {Marker} from 'react-native-maps';

export interface IMarkerCoordinates {
  latitude: number;
  longitude: number;
}

export interface IInitialRegion extends IMarkerCoordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IGoogleMap {
  marker?: IMarkerCoordinates | null;
  setMarker?: (marker: IMarkerCoordinates | null) => void | undefined;
  onEdit?: boolean;
}

export const GoogleMap = ({marker, setMarker, onEdit = true}: IGoogleMap) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={
          !marker
            ? {
                // Medallo by default
                latitude: 6.25089,
                longitude: -75.574628,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
            : {
                ...marker,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
        }
        customMapStyle={mapStyle}
        onPress={e =>
          typeof setMarker !== 'undefined' && onEdit
            ? setMarker(e.nativeEvent.coordinate)
            : null
        }>
        {marker && (
          <Marker
            draggable
            coordinate={marker}
            title={'Current location'}
            description={"This is the contact's current location"}
          />
        )}
      </MapView>
    </View>
  );
};

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight / 3, // Set height to 1/3 of screen height
    marginBottom: 10,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject, // Makes the map fill the container completely
  },
});
