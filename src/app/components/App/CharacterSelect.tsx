import { bind } from 'decko'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { getAvatarURL } from 'src/api'
import { preventDefault } from 'src/common/util/react'
import { StoredValue } from 'src/common/util/stored-value'

const avatarStyle = {
  width: '100px',
  height: '100px',
}

type CharacterSelectProps = {
  characters: string[]
  onSubmit: (character: string) => void
}

@observer
export class CharacterSelect extends React.Component<CharacterSelectProps> {
  @observable character = ''
  storedCharacter = new StoredValue<string>('CharacterSelect_character')

  @bind
  handleSubmit() {
    this.props.onSubmit(this.character)
  }

  @action.bound
  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.character = event.currentTarget.value
    this.storedCharacter.save(this.character).catch(console.error)
  }

  async componentDidMount() {
    const initialCharacter = await this.storedCharacter.restore()
    this.character = initialCharacter || ''
  }

  render() {
    return (
      <section className="text-center">
        <h1>Choose your identity.</h1>
        <p>
          <img
            style={avatarStyle}
            src={getAvatarURL(this.character)}
            alt={`Avatar for ${this.character}`}
          />
        </p>
        <form onSubmit={preventDefault(this.handleSubmit)}>
          <fieldset>
            <select value={this.character} onChange={this.handleChange}>
              {this.props.characters.map(name => <option key={name}>{name}</option>)}
            </select>
          </fieldset>
          <fieldset>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
      </section>
    )
  }
}
