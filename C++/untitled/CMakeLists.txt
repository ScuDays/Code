cmake_minimum_required(VERSION 3.22.1)
project(untitled)

set(CMAKE_CXX_STANDARD 17)

add_executable(untitled main.cpp)


find_package(Threads REQUIRED)
target_link_libraries(practice7_13_2 Threads::Threads)

# 寻找curses的库
find_package(Curses REQUIRED)
# 包含curses的库
include_directories(${CURSES_INCLUDE_DIR})
# ${CURSES_LIBRARIES}为添加内容
target_link_libraries(practice7_13_2 ${CURSES_LIBRARIES})