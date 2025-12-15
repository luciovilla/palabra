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
          target="_blank"
          rel="noreferrer"
        >
          check out the code
        </a>{' '}
        and{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold hover:text-foreground"
          target="_blank"
          rel="noreferrer"
        >
          play the original game
        </a>
        .
      </p>
      <p className="text-sm text-muted-foreground mt-4">
        Created by{' '}
        <a
          href="https://www.luciovilla.com/"
          className="underline font-bold hover:text-foreground"
          target="_blank"
          rel="noreferrer"
        >
          Lucio Villa
        </a>
        .
      </p>
    </BaseModal>
  )
}
