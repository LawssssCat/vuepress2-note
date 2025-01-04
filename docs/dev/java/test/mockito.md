---
title: Mockito 代码打桩、检测
---

Get - When - Then

todo mockito/powermock/BaizeTest for java dt

todo cloudsop/springboot


## Mock 和 Spy


### 使用 mock

Mock 不真正调用方法！

```bash
Star mock = mock(Star.class);

# 模拟返回值
when(mock.getName()).thenReturn("hello");
# 模拟多次返回值
when(mock.getName()).thenReturn("hello").thenReturn("world").thenReturn("!");
# 另一种写法
doReturn("hello").doReturn("world").doReturn("!").when(mock).getName();
# 返回空
doNothing().when(mock).getName();
```

### 使用 spy

Spy 会真正调用方法！
但是 Spy 也可以通过与 mock 相同的方式来打桩 Spy 对象，如： `Mockito.doReturn(100).when(spyList).size();`

```java

```

todo

## 场景

### UT for Spring Service with Mocked DAO

```java
@ContextConfiguration(locations = { "classpath:springContext/pool/applicationContext-ha.xml" })
@Runwith(SpringJUnit4ClassRunner.class)
public class HaMonitorTest {
  @Autowired
  private HaRepository haRepository;
  private MonitorService monitorService;
  @Mock
  private ConfigurationDao configurationDao;
  @Before
  public void setUp() {
    MockitoAnnotations.initMocks(this);
    monitorService = Mockito.spy(new MonitorServiceImpl());
    monitorService.setHaRepository(haRepository);
    monitorService.setConfigurationDao(configurationDao)
    HaDetailVo vo1 = TestUtils.createHaDetailVo(1, Constants.HA_STATE_RUN);
    HaDetailVo vo2 = TestUtils.createHaDetailVo(2, Constants.HA_STATE_RUN);
    haRepository.putHaState(vo1.getId(), vo1);
    haRepository.putHaState(vo2.getId(), vo2);
  }
  @Test
  public void shouldMonitorReturnActiveHas() {
    HaDetailVo vo = TestUtils.createHaDetailVo(3, Constants.HA_STATE_RUN);
    haRepository.putHaState(vo.getId(), vo);
    List<HaInfo> cache = monitorService.getHas();
    long oldTimeStamp = SystemTimer.currentTimeSeconds();
    while(SystemTimer.currentTimeSeconds() - oldTimeStamp < haRepository.getPeriodSync()) {
      cache = monitorService.getHas();
      when(configurationDao.getAllHa()).thenReturn(cache);
      monitorService.monitorHaState();
    }
    monitorService.monitorHaState();

    Assert.assertEquals(2, cache.size());
    Assert.assertArrayEquals({1,2}, cache.get(0).getHaCode(), cache.get(1).getHaCode());
    Assert.assertEquals(Constants.HA_STATE_RUN, haRepository.getHaState(cache.get(0).getHaCode()).getHaState());
    Assert.assertEquals(Constants.HA_STATE_RUN, haRepository.getHaState(cache.get(1).getHaCode()).getHaState());
  }
}
```
