import TeamMember from '../../components/teams/TeamMember';
import { StoryblokComponent } from '@storyblok/react';
const Teams = ({ blok }) => {
  return (
    <div
      className="axil-team-area ax-section-gap bg-color-lightest"
      style={blok?.BGColor?.color ? { background: blok?.BGColor?.color } : {}}
    >
      <div className="container">
        <div
          className={`row align-items-end justify-content-center justify-content-xl-start`}
        >
          <div
            className={`section-title text-${
              blok?.centeredTitle === true ? 'center' : 'start'
            }`}
          >
            {blok?.Tag &&
              blok?.Tag?.length > 0 &&
              blok?.Tag.map((tag, index) => (
                <StoryblokComponent blok={tag} key={`${index}`} />
              ))}
            {blok?.Title && (
              <h2
                className={`title  ${
                  blok.Tag ? ' ' : 'col-lg-12 col-xl-4 mb--0'
                }`}
              >
                <span
                  style={
                    blok?.TitleColor?.color
                      ? { color: blok?.TitleColor?.color }
                      : {}
                  }
                >
                  {blok.Title}
                </span>
              </h2>
            )}
            {blok?.Description && (
              <div
                className="subtitle-2 mb--0 mb_lg--20 mb_md--20 mb_sm--15 custom-color "
                style={{
                  color: blok?.DescriptionColor?.color
                    ? blok?.DescriptionColor?.color
                    : '#757589',
                }}
              >
                {blok?.Description}
              </div>
            )}
          </div>
          <div className={`row team__wrap`}>
            {blok?.Team &&
              blok?.Team?.map((team, teamIndex) => {
                return (
                  <div
                    className="team__cards col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt--60 mt_sm--30 mt_md--30"
                    key={`team-${teamIndex}`}
                  >
                    <TeamMember
                      team={team}
                      CardBorder={blok?.RemoveCardBorder}
                      CardAnimation={blok?.RemoveCardAnimation}
                      TitleColor={blok?.TeamCardTextColor?.color || ''}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
