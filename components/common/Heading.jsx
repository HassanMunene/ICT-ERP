/**
 * Heading component for displaying a title and description.
 *
 * @param {object} props - Component props
 * @param {string} props.title - The title to be displayed.
 * @param {string} props.description - The description to be displayed.
 * @returns {JSX.Element} The Heading component.
 */
const Heading = ({ title, description }) => {
    return (
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    );
};
  
export default Heading;