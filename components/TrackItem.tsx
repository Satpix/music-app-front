import * as React from 'react';
import { ITrack } from '../types/track';


interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active }) => {
  return ( 
    <div>
        {track.name}
    </div>
   );
}
 
export default TrackItem;