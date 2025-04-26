'use client'

import { defaultValue } from '@/consts/default-value'
import { GithubUser } from '@/types/github-user'

import debounce from 'lodash.debounce'
import { useState, useTransition } from 'react'

import { LOCATIONS } from '@/consts/locations'
import { Location } from '@/types/location'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function Home() {
  const [isPending, startTransition] = useTransition()
  const [options, setOptions] = useState<GithubUser[]>([])
  const [location, setLocation] = useState<Location>(LOCATIONS[0])

  const [conversation, setConversation] = useState<string>('')
  const [selectedOptions, setSelectedOptions] = useState<GithubUser[]>([
    defaultValue,
  ])

  const handleAutoCompleteInputChange = debounce(async (query: string) => {
    if (!query) {
      setOptions([])
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/github', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })
        const data = await response.json()
        startTransition(() => {
          setOptions(data)
        })
      } catch (error) {
        console.error('Error searching GitHub users:', error)
        setOptions([])
      }
    })
  }, 350)

  const generateConversation = async () => {
    setConversation('')
    startTransition(async () => {
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ users: selectedOptions, location }),
        })
        const data = await response.json()
        startTransition(() => {
          setConversation(data.conversation)
        })
      } catch (error) {
        console.error('Error generating conversation:', error)
      }
    })
  }

  const handleOptionChange = (
    _: React.SyntheticEvent,
    newValue: GithubUser[],
  ) => {
    if (newValue.length <= 2) {
      setSelectedOptions(newValue)
    }
  }

  return (
    <>
      <Typography variant="overline">Meet at the sauna</Typography>
      <Stack spacing={2} alignSelf={'center'}>
        <Autocomplete
          fullWidth
          multiple
          id="github-users"
          size="medium"
          limitTags={2}
          loading={isPending}
          options={options}
          value={selectedOptions}
          onChange={handleOptionChange}
          onInputChange={(_, newInputValue) =>
            handleAutoCompleteInputChange(newInputValue)
          }
          getOptionLabel={(option) => option.login}
          getOptionDisabled={() => selectedOptions.length >= 2}
          filterSelectedOptions
          disableCloseOnSelect
          // disabled={false}
          renderInput={(params) => (
            <TextField {...params} placeholder="Type a Github username" />
          )}
          renderValue={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.name}
                avatar={<Avatar alt={option.name} src={option.avatarUrl} />}
                size="medium"
              />
            ))
          }
          renderOption={(props, option) => (
            <Box {...props} component="li" key={option.id} sx={{ gap: 1 }}>
              <Avatar
                key={option.id}
                alt={option.login}
                src={option.avatarUrl}
              />
              <Box key={option.avatarUrl}>
                <span>{option.login}</span>
                {option.name && (
                  <div style={{ fontSize: '0.8em', color: '#666' }}>
                    {option.name}
                  </div>
                )}
              </Box>
            </Box>
          )}
        />
        <Autocomplete
          fullWidth
          disablePortal
          options={LOCATIONS}
          value={location}
          disabled={isPending}
          onChange={(_, newValue) => setLocation(newValue as Location)}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <Button
          onClick={generateConversation}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPending || selectedOptions.length < 2}
          sx={{ minWidth: 'max-content' }}
        >
          {isPending ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={20} color="inherit" />
              Generating...
            </Box>
          ) : (
            'Generate conversation'
          )}
        </Button>
        {conversation && (
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                {conversation}
              </Typography>
            </CardContent>
            <CardActions>
              <Button>Share</Button>
            </CardActions>
          </Card>
        )}
      </Stack>
    </>
  )
}
