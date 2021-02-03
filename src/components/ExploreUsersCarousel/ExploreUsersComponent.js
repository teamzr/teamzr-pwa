import { Avatar } from '@material-ui/core';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import propTypes from 'prop-types';

function ExploreUsersComponent(props) {
  const { data } = props;

  return (
    <AutoRotatingCarousel
      landscape
      open={true}
      autoplay={true}
      landscape={true}
    >
      {data.map((user, i) => (
        <Slide
          key={i}
          title={user.name}
          subtitle={user.email}
          media={<Avatar />}
          mediaBackgroundStyle={{ background: 'transparent' }}
        />
      ))}
    </AutoRotatingCarousel>
  );
}

ExploreUsersComponent.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
};

export default ExploreUsersComponent;
