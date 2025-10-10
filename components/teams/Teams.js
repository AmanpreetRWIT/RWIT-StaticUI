import TeamMember from './TeamMember';
import Tags from '../common/Tag';

const Teams = ({
  BGColor,
  centeredTitle,
  Tag,
  Title,
  TitleColor,
  Description,
  DescriptionColor,
  Team,
  RemoveCardBorder,
  RemoveCardAnimation,
  TeamCardTextColor,
}) => {
  return (
    <div
      className="axil-team-area ax-section-gap bg-color-lightest"
      style={BGColor?.color ? { background: BGColor.color } : {}}
    >
      <div className="container">
        <div className="row align-items-end justify-content-center justify-content-xl-start">
          <div
            className={`section-title text-${
              centeredTitle === true ? 'center' : 'start'
            }`}
          >
            {Tag &&
              Tag.length > 0 &&
              Tag.map((tag, index) => <Tags blok={tag} key={index} />)}

            {Title && (
              <h2
                className={`title ${Tag ? '' : 'col-lg-12 col-xl-4 mb--0'}`}
              >
                <span
                  style={
                    TitleColor?.color ? { color: TitleColor.color } : {}
                  }
                >
                  {Title}
                </span>
              </h2>
            )}

            {Description && (
              <div
                className="subtitle-2 mb--0 mb_lg--20 mb_md--20 mb_sm--15 custom-color"
                style={{
                  color: DescriptionColor?.color
                    ? DescriptionColor.color
                    : '#757589',
                }}
              >
                {Description}
              </div>
            )}
          </div>

          <div className="row team__wrap">
            {Team &&
              Team.map((team, teamIndex) => (
                <div
                  className="team__cards col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt--60 mt_sm--30 mt_md--30"
                  key={`team-${teamIndex}`}
                >
                  <TeamMember
                    team={team}
                    CardBorder={RemoveCardBorder}
                    CardAnimation={RemoveCardAnimation}
                    TitleColor={TeamCardTextColor?.color || ''}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
