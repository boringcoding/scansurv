import tw from "twin.macro"

const containerVariants = {
  container: tw`container relative`,
  full: tw`mx-auto px-5`,
}

const styles = {
  container: ({ variant = "container" }) => [containerVariants[variant]],
}

const Container = ({ variant, children, ...props }) => (
  <div css={styles.container({ variant })} {...props}>
    {children}
  </div>
)

export default Container
