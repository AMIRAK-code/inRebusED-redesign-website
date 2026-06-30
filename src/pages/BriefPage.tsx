import { useLocation } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import Brief from '../components/Brief/Brief'
import Seo from '../components/ui/Seo/Seo'
import { useT } from '../i18n/LangContext'

export default function BriefPage() {
  const { t } = useT()
  const location = useLocation()

  return (
    <>
      <Seo
        title={t('meta.brief.title')}
        description={t('meta.brief.description')}
        path={location.pathname}
      />
      <Nav minimal />
      <main>
        <Brief />
      </main>
    </>
  )
}
