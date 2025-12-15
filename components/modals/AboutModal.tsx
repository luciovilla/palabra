import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-muted-foreground">
        This is an open source clone of the game Wordle -{' '}
        <a
          href="https://github.com/luciovilla/palabra"
          className="underline font-bold hover:text-foreground"
        >
          check out the code
        </a>{' '}
        and{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold hover:text-foreground"
        >
          play the original game
        </a>
        .
      </p>
    </BaseModal>
  )
}
