import React from 'react'
import { Flex, Spin } from 'antd'
import useFetch from '../../hooks/useFetch'
import { getInstructions } from '../../services/InstructionService'
import InstructionCard from '../../components/InstructionCard'

const InstructionsPreviews = () => {
  const instructions = useFetch(getInstructions)

  return (
    <Flex size={'large'} justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      {instructions.loading ? (
        <Spin />
      ) : (
        instructions.data?.map((i) => <InstructionCard content={i} key={i.instructionId} /> ?? 'я пустой')
      )}
    </Flex>
  )
}

export default InstructionsPreviews
