import Home from '../views/sandbox/Home/Home';
import UserList from '../views/sandbox/user-manage/UserList';
import RoleList from '../views/sandbox/right-manage/RoleList';
import RightList from '../views/sandbox/right-manage/RightList';
import NewsAdd from '../views/sandbox/news-manage/NewsAdd';
import NewDraft from '../views/sandbox/news-manage/NewDraft';
import NewCategory from '../views/sandbox/news-manage/NewCategory';

import Audit from '../views/sandbox/audit-manage/Audit';
import AuditList from '../views/sandbox/audit-manage/AuditList';

import UnpubLished from '../views/sandbox/publish-manage/UnpubLished';
import PubLished from '../views/sandbox/publish-manage/PubLished';
import Sunset from '../views/sandbox/publish-manage/Sunset';


const LocalTouterMap = {
    '/home': <Home />,
    '/user-manage/list': <UserList />,
    '/right-manage/role/list': <RoleList />,
    '/right-manage/right/list': <RightList />,
    '/news-manage/add': <NewsAdd />,
    '/news-manage/draft': <NewDraft />,
    '/news-manage/category': <NewCategory />,
    '/audit-manage/audit': <Audit />,
    '/audit-manage/list': <AuditList />,
    '/publish-manage/unpublished': <UnpubLished />,
    '/publish-manage/published': <PubLished />,
    '/publish-manage/sunset': <Sunset />

}
export default LocalTouterMap;