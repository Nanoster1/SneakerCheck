import React from 'react'
import { Flex, Spin } from 'antd'
import useFetch from '../../hooks/useFetch'
import { getInstructions } from '../../services/InstructionService'
import InstructionCard from '../../components/InstructionCard'
import { searchMatching } from '../../utils/SearchEngine'
import { useSearchParams } from 'react-router-dom';
import GradientText from '../../components/GradientText'

const InstructionsPreviews = () => {
  const allInstructions = useFetch(getInstructions)

  const [searchParams] = useSearchParams();

  const model = searchParams.get('model');
  const category = searchParams.get('category');

  console.log({ model, category });

  const instructions = allInstructions.data?.filter(i => !category || i.category.toString() === category)
  let filtered = instructions ? searchMatching(instructions, (item) => item.productName, model ?? '') : null
  filtered = filtered?.length ?? 0 > 0 ? filtered : null

  console.log({filtered})

  return (
    <Flex justify={'center'} gap={16} vertical style={{ maxWidth: '800px', margin: '16px auto 0 auto' }}>
      <GradientText text={'Инструкции по запросу'} />
      {allInstructions.loading ? (
        <Spin />
      ) : (
        filtered ? filtered.map((i) => <InstructionCard content={i} key={i.id} />) : 'Инструкций не найдено'
      )}
    </Flex>
  )
}

export default InstructionsPreviews
